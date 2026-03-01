#!/bin/bash

# Stripe Product & Price Setup Script
# Creates the Pro subscription product in Stripe

set -e

echo "=========================================="
echo "  Stripe Pro Subscription Setup"
echo "=========================================="

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo "Error: Stripe CLI is not installed."
    echo "Install from: https://stripe.com/docs/stripe-cli"
    exit 1
fi

# Check for API key
if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "Error: STRIPE_SECRET_KEY not set"
    exit 1
fi

echo ""
echo "This will create:"
echo "  - Product: FreeTranscriptAI Pro"
echo "  - Price: \$9.99/month (USD)"
echo ""

read -p "Continue? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "Aborted."
    exit 0
fi

# Create the product
echo "Creating product..."
PRODUCT=$(stripe products create \
    --name="FreeTranscriptAI Pro" \
    --description="Pro subscription for FreeTranscriptAI - unlimited transcriptions, no ads" \
    --active=true \
    --json)

PRODUCT_ID=$(echo "$PRODUCT" | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)
echo "Product created: $PRODUCT_ID"

# Create the price
echo "Creating price..."
PRICE=$(stripe prices create \
    --product="$PRODUCT_ID" \
    --unit-amount=999 \
    --currency=usd \
    --recurring[interval]=month \
    --json)

PRICE_ID=$(echo "$PRICE" | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)
echo "Price created: $PRICE_ID"

echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo ""
echo "Add these to your environment:"
echo ""
echo "  STRIPE_PRO_PRICE_ID=\"$PRICE_ID\""
echo ""
echo "Or copy the price ID: $PRICE_ID"
echo ""
