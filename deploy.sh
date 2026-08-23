#!/bin/bash
# Redeploy landing page staging: pull nhánh staging + build lại
set -e
cd /opt/landingpage-staging
git pull origin staging
npm ci
npm run build
echo "Deployed: $(git log -1 --oneline)"
