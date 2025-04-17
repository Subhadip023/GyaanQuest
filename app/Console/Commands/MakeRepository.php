<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeRepository extends Command
{
    protected $signature = 'make:repo {model_name}';
    protected $description = 'Generate a repository class and interface with CRUD methods';

    public function handle()
    {
        $name = Str::studly($this->argument('model_name'));
        $className = $name . 'Repository';
        $interfaceName = $name . 'RepositoryInterface';

        // Define paths
        $repoPath = app_path("Repositories/{$className}.php");
        $interfacePath = app_path("Repositories/Interfaces/{$interfaceName}.php");

        // Ensure directory exists
        if (!File::exists(app_path('Repositories/Interfaces'))) {
            File::makeDirectory(app_path('Repositories/Interfaces'), 0755, true);
        }

        // Create Interface if not exists
        if (!File::exists($interfacePath)) {
            $interfaceTemplate = <<<EOD
<?php

namespace App\Repositories\Interfaces;

interface {$interfaceName}
{
    public function getAll();
    public function create(array \$data);
    public function update(\$id, array \$data);
    public function delete(\$id);
}
EOD;
            File::put($interfacePath, $interfaceTemplate);
            $this->info("Interface created: {$interfaceName}");
        } else {
            $this->warn("Interface already exists: {$interfaceName}");
        }

        // Create Repository class if not exists
        if (!File::exists($repoPath)) {
            $repositoryTemplate = <<<EOD
<?php

namespace App\Repositories;

use App\Repositories\Interfaces\\{$interfaceName};
use App\Models\\{$name};

class {$className} implements {$interfaceName}
{
    public function getAll()
    {
        return {$name}::all(); 
    }

    public function create(array \$data)
    {
        return {$name}::create(\$data);
    }

    public function update(\$id, array \$data)
    {
        \$model = {$name}::findOrFail(\$id);
        \$model->update(\$data);
        return \$model;
    }

    public function delete(\$id)
    {
        return {$name}::delete(\$id);
    }
}
EOD;
            File::put($repoPath, $repositoryTemplate);
            $this->info("Repository created: {$className}");
        } else {
            $this->warn("Repository already exists: {$className}");
        }

        // Register binding in AppServiceProvider
        $providerPath = app_path('Providers/AppServiceProvider.php');
        $bindingLine = "\$this->app->bind(\\App\\Repositories\\Interfaces\\{$interfaceName}::class, \\App\\Repositories\\{$className}::class);";

        if (File::exists($providerPath)) {
            $providerContent = File::get($providerPath);

            if (!str_contains($providerContent, $bindingLine)) {
                $providerContent = preg_replace(
                    '/public function register\(\): void\s*\{\n/',
                    "public function register(): void\n    {\n        {$bindingLine}\n",
                    $providerContent
                );

                File::put($providerPath, $providerContent);
                $this->info("Binding added to AppServiceProvider.");
            } else {
                $this->info("Binding already exists in AppServiceProvider.");
            }
        }

        $this->info("Repository and interface with CRUD methods created successfully!");
    }
}
