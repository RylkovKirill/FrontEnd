using System;
using System.Collections.Generic;
using System.Text;

namespace Chat
{
    class Client
    {
        public string Name { get; private set; }
        public string Hostname { get; private set; }
        public int LocalPort { get; private set; }
        public int RemotePort { get; private set; }

        public Client(string name, string hostname, int localPort, int remotePort)
        {
            this.Name = name;
            this.Hostname = hostname;
            this.LocalPort = localPort;
            this.RemotePort = remotePort;
        }
    }
}
