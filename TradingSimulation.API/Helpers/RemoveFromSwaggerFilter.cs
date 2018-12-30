using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace TradingSimulation.API.Helpers
{
    public class RemoveFromSwaggerFilter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            // swaggerDoc.Components.Schemas.Remove("Wallet");
            // swaggerDoc.Components.Schemas.Remove("User");
            // swaggerDoc.Components.Schemas.Remove("IdentityRole");
            // swaggerDoc.Components.Schemas.Remove("Trade");
        }
    }

    
}