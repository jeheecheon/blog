namespace Server.DTOs;

public class GoogleUserInfoResponse { 
    public string id { get; set; }
    public string email { get; set; }
    public bool verified_email { get; set; }
    public string picture { get; set; }
}