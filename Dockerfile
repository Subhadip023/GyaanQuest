# Use official PHP image
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl zip unzip git libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copy Laravel files
COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install Node.js & Build Frontend
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install \
    && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html
# Give the proper permissions to the storage directory
RUN chmod -R 775 /var/www/html/storage

# Make sure the web server user (e.g., www-data) can access the storage directory
RUN chown -R www-data:www-data /var/www/html/storage


# Start Laravel
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000