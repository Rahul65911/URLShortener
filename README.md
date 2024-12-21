# URL Shortener with Click Analytics

This is a **Node.js-based URL shortener** that generates short URLs and tracks detailed **click analytics**, including geographic location, device type (mobile, desktop, tablet), and referral sources.

## Features

- **URL Shortening**: Easily convert long URLs into short, shareable links.
- **Click Analytics**: Track detailed data on each click, including:
  - **Click count**: Total number of clicks for each shortened URL.
  - **Geographic location**: Country and city of users who click your link.
  - **Device type**: Mobile, tablet, or desktop.
  - **Referrals**: Track where the click is coming from (e.g., social media, websites).
  - **Click timestamp**: Time when the link was clicked.
  
## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Geolocation**: `geoip-lite` for IP-based location tracking.
- **Device Detection**: `useragent` for identifying the device type.
- **API**: RESTful API for creating short URLs and fetching analytics.

## Installation

### Prerequisites

Make sure you have **Node.js** and **MongoDB** installed on your machine.