﻿using System.Collections.Concurrent;
using ChatApp.Models;

namespace ChatApp.DataService;

public class SharedDb
{
    private readonly ConcurrentDictionary<string, UserConnection> _connection = new ConcurrentDictionary<string, UserConnection>();

    public ConcurrentDictionary<string, UserConnection> connections =>  _connection;
}