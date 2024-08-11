using ChatApp.DataService;
using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _db;
    public ChatHub(SharedDb db) => _db = db;
    
    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined");
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
        _db.connections[Context.ConnectionId] = conn;
        await Clients.Groups(conn.Chatroom)
            .SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined the room {conn.Chatroom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_db.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Groups(conn.Chatroom)
                .SendAsync("ReceiveSpecificMessage", conn.Username, msg);
        }
    }
}