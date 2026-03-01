#!/bin/bash

# Stripe Webhook Setup Script
# This script helps configure Stripe webhooks locally and for production

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "  Stripe Webhook Setup"
echo "=========================================="

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo -e "${RED}Error: Stripe CLI is not installed.${NC}"
    echo "Install it from: https://stripe.com/docs/stripe-cli"
    echo ""
    echo "Or use Homebrew:"
    echo "  brew install stripe/stripe-cli/stripe"
    exit 1
fi

# Check environment
if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo -e "${YELLOW}Warning: STRIPE_SECRET_KEY not set in environment${NC}"
    echo "Make sure to set it before running this script"
fi

echo ""
echo "Options:"
echo "  1) Listen for webhooks locally (development)"
echo "  2) Create webhook endpoint (production)"
echo "  3) List all webhooks"
echo "  4) Delete webhook"
echo ""

read -p "Choose an option (1-4): " choice

case $choice in
    1)
        echo ""
        echo "Starting local webhook listener..."
        echo "Forwarding to: http://localhost:3000/api/stripe/webhook"
        echo ""
        echo "Press Ctrl+C to stop"
        echo ""
        stripe listen --forward-to localhost:3000/api/stripe/webhook
        ;;

    2)
        echo ""
        echo "Creating webhook endpoint..."
        read -p "Enter your base URL (e.g., https://freetranscriptai.com): " BASE_URL

        # Create the webhook
        WEBHOOK_URL="${BASE_URL}/api/stripe/webhook"

        stripe webhooks create \
            --url="$WEBHOOK_URL" \
            --events="checkout.session.completed,customer.subscription.updated,customer.subscription.deleted,invoice.payment_failed"

        echo ""
        echo -e "${GREEN}Webhook created successfully!${NC}"
        echo "Endpoint: $WEBHOOK_URL"
        echo ""
        echo "Make sure to set STRIPE_WEBHOOK_SECRET in your environment"
        ;;

    3)
        echo ""
        echo "Listing all webhooks..."
        stripe webhooks list
        ;;

    4)
        echo ""
        echo "Available webhooks:"
        stripe webhooks list
        echo ""
        read -p "Enter webhook ID to delete: " WEBHOOK_ID

        stripe webhooks delete "$WEBHOOK_ID"
        echo -e "${GREEN}Webhook deleted successfully!${NC}"
        ;;

    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac
