name: Build, Security Scan, and Push to AWS ECR

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

# OIDC permissions required to authenticate with AWS without long-lived keys
permissions:
  id-token: write
  contents: read
  security-events: write # Required if uploading SARIF reports to GitHub Security tab

jobs:
  ci-cd-pipeline:
    name: Build, Scan & Push
    runs-on: ubuntu-latest

    steps:
      # --- Step 1: Checkout Code ---
      - name: Checkout repository
        uses: actions/checkout@v4

      # --- Step 2: Configure AWS Credentials via OIDC ---
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ env.ROLE_TO_ASSUME }}
          aws-region: ${{ env.AWS_REGION }}

      # --- Step 3: Login to Amazon ECR ---
      - name: Log in to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      # --- Step 4: Set Up Docker Buildx ---
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # --- Step 5: Build Image & Export to Local Docker Daemon ---
      # Docker Buildx builds the image locally so Trivy can scan it before pushing to ECR
      - name: Build Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          load: true # Loads image into local `docker images` context
          tags: |
            ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ github.sha }}
            ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      # --- Step 6: Security Scan (Trivy) ---
      - name: Run Trivy Vulnerability Scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ github.sha }}
          format: 'table'
          exit-code: '1' # Fails the build if vulnerabilities are found
          ignore-unfixed: true
          severity: 'CRITICAL,HIGH'

      # --- Step 7: Push Image to ECR (Only if Push to main) ---
      - name: Push Image to AWS ECR
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          docker push ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ github.sha }}
          docker push ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:latest