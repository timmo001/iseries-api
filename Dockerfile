ARG BUILD_FROM=frolvlad/alpine-oraclejdk8
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

WORKDIR /usr/src/app

# Copy source files
COPY . .

# Install packages
RUN apk add --no-cache \
      curl=7.61.1-r0 \
      ca-certificates=20171114-r3 \
      bash=4.4.19-r1 \
      make=4.2.1-r2 \
      g++=6.4.0-r9 \
      python2=2.7.15-r1 \
      nodejs-current=9.11.1-r2 \
      yarn=1.7.0-r0

# Install dependencies
RUN yarn install && yarn cache clean

# Expose outbound ports
EXPOSE 28365

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    maintainer="Timmo <contact@timmo.xyz>" \
    org.label-schema.description="REST API and Websocket for access to IBM iSeries (IBMi) and AS/400 systems" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="iSeries API" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://git.timmo.xyz/iseries-api" \
    org.label-schema.usage="https://github.com/timmo001/iseries-api/tree/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/timmo001/iseries-api" \
    org.label-schema.vendor="Timmo"

# Set run CMD
CMD \
    echo "" \
    && echo "Copy certs if provided.." \
    && if [ "x$CERTIFICATES_DIR" = "x" ]; then echo "No certificates directory provided"; else cp ${CERTIFICATES_DIR}/* ./ ; fi \
    && echo "Run app.." \
    && node index.js
