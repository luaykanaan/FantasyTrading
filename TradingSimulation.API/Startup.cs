using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TradingSimulation.API.Context;
using TradingSimulation.API.Models;
using TradingSimulation.API.Repos;
using Microsoft.OpenApi.Models;
using TradingSimulation.API.Helpers;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Pomelo.EntityFrameworkCore.MySql;

namespace TradingSimulation.API
{
    public class Startup
    {

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // -----------------------------------------------------------------------------------------------
        // Configureservices for development and production and shared
        // -----------------------------------------------------------------------------------------------
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            // connection string
            services.AddDbContext<DataContext>(options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection")));

            // call shared
            ConfigureSharedServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            // connection string
            services.AddDbContext<DataContext>(options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection")));

            // call shared
            ConfigureSharedServices(services);
        }

        private void ConfigureSharedServices(IServiceCollection services)
        {

            //# data section
            services.AddTransient<Seed>();
            services.AddScoped<IAppRepo, AppRepo>();

            //# identity
            services.AddIdentity<User, IdentityRole>
                (options => {
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._";
                options.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<DataContext>()
                .AddRoleValidator<RoleValidator<IdentityRole>>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddSignInManager<SignInManager<User>>();

            //# token and authentication
            var appSettingsTokenKey = Configuration.GetSection("AppSettings:TokenKey").Value;
            var key = Encoding.ASCII.GetBytes(appSettingsTokenKey);
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            //# authorization plolicy for roles


            //# general settings
            services
                .AddMvc(options => {
                    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                    options.Filters.Add(new AuthorizeFilter(policy));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(opt => { opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; } );

            //# third-party services
            services.AddAutoMapper();
            services.AddSwaggerGen(options => { 
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Fantacy Trading API", Version = "v1" });
                options.DocumentFilter<RemoveFromSwaggerFilter>();
                });

        }
        // -----------------------------------------------------------------------------------------------
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // -----------------------------------------------------------------------------------------------
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {   
                // gloobal error handler in production mode:
                app.UseExceptionHandler( builder => {
                    builder.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }

            //app.UseHttpsRedirection();
            seeder.SeedData();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSwagger();
            app.UseSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "Fantacy Trading API"); });

            app.UseMvc(routes => { routes.MapSpaFallbackRoute( name: "spa-fallback", defaults: new { controller = "Fallback", action = "Index"} ); } );
        }

    }
}
