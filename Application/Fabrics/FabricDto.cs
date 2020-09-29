using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Fabrics
{
    public class FabricDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }

        [JsonPropertyName("clients")]
        public ICollection<ClientDto> UserActivities { get; set; }
    }
}