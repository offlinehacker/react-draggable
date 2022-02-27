# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.217.4/containers/javascript-node/.devcontainer/base.Dockerfile

ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Install chrome/firefox binary dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        libnss3-dev libatk1.0-0 libatk-bridge2.0-0 libcups2 libasound2 libcairo2 libdrm2 \
        libgbm1 libpango-1.0-0 libxcomposite1 libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 libxshmfence
