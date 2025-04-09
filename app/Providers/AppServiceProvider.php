<?php

namespace App\Providers;

use App\Repositories\Interfaces\RoleReposetoryInterface;
use App\Repositories\RoleReposetory;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RoleReposetoryInterface::class, RoleReposetory::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
