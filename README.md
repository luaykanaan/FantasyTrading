# Fantasy Trading Web App

```
This is app is fantasy based. You will be trading with wood, gems, elixir and coins.
The project is not intended to focus on the trading, but rather on the technologies, libraries and third party services used to build the app. If your aim is to use the app for real-world trading, then look elsewhere. This app was designed as a fun/game like app with focus on stitching the app rather than how to real-world trade.
```

![Alt text](/Screenshot-1.png?raw=true "Fantacy Trading Screenshot")

## Technologies used
This app was created using: 
- .Net Core 2.1 
- Entity Framework Core 2.1
- IdentityCore model
- JWT Authentication
- Swashbuckle/Swagger API documentation
- Sentry.io error and exceptions tracking and collection saas
- MySql
- Angular 7
- Angular Material
- ngx-toastr
- ngx-avatar
- ngx-bootstrap
- ngx-charts

## Usage
You need to add your own appsettings.json, appsettings.development.json and Program.cs files to the API project to be able to run the app. Specifically, you need to add the connection strings and the jwt secret key you will be using. Here is an example appsettings,json file:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost; Database=FantacyTradingProd; User=YourUserName; Password=YourPassword"
  },
  "AppSettings": {
    "TokenKey": "YourStrongJwtTokenKey"
  },
  "AllowedHosts": "*"
}
```
And this is how your Program.cs should look like:
```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace TradingSimulation.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseSentry("https://YYYYYYYYY@sentry.io/ZZZZZZZZ");
    }
}
```

## Security
### In the API
A few notes about security. Although this demo implements the standard api security features like authentication, roles policies and limiting controller access, more could be done. For example, having seperate DbContext for users and business data. Also, limiting controller actions not only to authenticated users, but also to the user allowed to execute the action (typically, by checking the user id in the token against User ClaimTypes.NameIdentifier). So, consider implementing these measures and more if you want to use this project in a production environment.
### In Swagger
You'll probably want to hide some models displayed in the swagger page
