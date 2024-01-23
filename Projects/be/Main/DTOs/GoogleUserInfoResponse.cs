namespace Server.DTOs;

public class GoogleUserInfoResponse { 
    public string id { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public bool verified_email { get; set; }
    public string picture { get; set; } = string.Empty;
}