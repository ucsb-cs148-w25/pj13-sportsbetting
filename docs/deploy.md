# Deployment Guide

## Overview

This document outlines the deployment process for our web application. We utilize a CI/CD pipeline implemented through GitHub Actions and Render for hosting. This approach automates testing and deployment procedures, streamlining the workflow for developers.

## Deployment Architecture

- **Repository**: GitHub
- **Hosting Platform**: Render
- **CI/CD**: GitHub Actions
- **Deployment Strategy**: Automated deployments triggered by merges to the `dev` branch

## Deployment Process

### For Developers

The deployment process has been simplified to require minimal manual intervention. Follow these steps to deploy changes:

1. Create a feature branch from the `dev` branch
   ```bash
   git checkout dev
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Implement your changes and commit them
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your feature branch to GitHub
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Create a Pull Request (PR)
   - Navigate to the repository on GitHub
   - Click on "Pull Requests" > "New Pull Request"
   - Set the base branch to `dev` and compare branch to your feature branch
   - Fill in PR description with details about your changes
   - Submit the PR

5. Wait for code review and approval
   - Address any feedback or requested changes
   - Once approved, the PR can be merged

6. Deployment
   - When your PR is merged into `dev`, the GitHub Actions workflow automatically triggers
   - The pipeline will run all tests and, if successful, deploy to Render

7. View Live Changes
   - After the GitHub Actions workflow completes successfully, your changes will be live
   - View the deployed application at: https://pj13-sportsbetting-1-frontend.onrender.com/
   - It may take a few minutes for Render to complete the deployment after the GitHub Action has finished

### Monitoring Deployment

You can monitor the deployment progress in two places:

1. **GitHub Actions**: Navigate to the "Actions" tab in the GitHub repository to view the workflow execution status.

2. **Render Dashboard**: Log in to the Render dashboard to see the deployment status and logs.

## CI/CD Pipeline Overview

Our CI/CD pipeline automatically handles the testing and deployment process when changes are merged to the `dev` branch:

- When a PR is merged, GitHub Actions automatically runs all tests
- If tests pass successfully, the pipeline triggers a deployment hook for Render
- Render then builds and deploys the updated application

This automated process ensures that only properly tested code is deployed to the hosting environment.

## Troubleshooting

### Common Issues

1. **Failed Tests**: If the GitHub Actions workflow fails due to test errors, fix the issues in your feature branch and update your PR.

2. **Deployment Failure**: If the deployment to Render fails:
   - Check the Render logs for specific error messages
   - Verify that environment variables are correctly configured
   - Ensure the deployment hook URL is valid

3. **Changes Not Visible**: If your changes don't appear on the live site:
   - Confirm the GitHub Action completed successfully
   - Check Render logs for deployment status
   - Clear your browser cache or try a private/incognito window
   - Allow up to 5 minutes for Render to complete the deployment process

### Getting Help

If you encounter persistent deployment issues, please contact the team or create an issue in the repository with the following information:
- Description of the problem
- Link to the failed GitHub Actions run
- Any relevant error messages

## Best Practices

1. **Always create a feature branch** - Never commit directly to the `dev` branch.

2. **Run tests locally** before pushing changes to avoid CI pipeline failures.

3. **Keep PRs focused and small** to simplify code review and reduce the risk of deployment issues.

4. **Include thorough PR descriptions** to help reviewers understand your changes.

5. **Monitor your deployment** after merging to ensure it completes successfully.

---

*Last updated: March 8, 2025*
