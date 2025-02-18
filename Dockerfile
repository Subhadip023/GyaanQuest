# Use official PHP image
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl zip unzip git libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer files and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy the rest of the application
COPY . .

# Install Node.js & Build Frontend
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && cp -R /var/www/html/package*.json ./ \
    && npm install \
    && npm run build

# Create storage directory and logs subdirectory if they don't exist
RUN mkdir -p /var/www/html/storage/logs && chown -R www-data:www-data /var/www/html/storage && chmod -R 775 /var/www/html/storage

# Make sure the web server user (e.g., www-data) can access the storage directory
RUN chown -R www-data:www-data /var/www/html/storage

# Start Laravel
CMD php artisan serve --host=0.0.0.0 --port=10000
