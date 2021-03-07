using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Chat
{
    class Program
    {
        const string Hostname = "127.0.0.1";
        const int MaxAttempt = 20;

        static Client client;
        static List<Message> messages;
        static int current = 0;
        static bool isDelivered = false;
        static bool isExit = false;
        static Socket listeningSocket;
        static Task receiving;
        static EndPoint remotePoint;

        static void Main(string[] args)
        {
            Program program = new Program();
            client = program.Configure();
            Console.WriteLine("Welcome");
            Console.WriteLine("Enter '~exit' to exit");
            Console.WriteLine("Enter '~save' to save messages");
            messages = new List<Message>();
            listeningSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            receiving = new Task(Receiving);
            receiving.Start();
            while (true)
            {
                Sending();
                if (isExit)
                {
                    break;
                }
            }
        }

        public static void Sending()
        {
            Message message;
            string input = Console.ReadLine();
            if (input == "~exit")
            {
                isExit = true;
                message = new Message(MessageType.Сommon, current, client.Name + " left chat", DateTime.Now, client.Name);
                listeningSocket.SendTo(Encoding.Unicode.GetBytes(message.ToString()), remotePoint);
                Console.WriteLine("Goodbye");
                Exit();
                return;
            }
            else if (input == "~save")
            {
                Save();
                Console.WriteLine("Messages saved");
                return;
            }
            message = new Message(MessageType.Сommon, current, input, DateTime.Now, client.Name);
            byte[] buffer = Encoding.Unicode.GetBytes(message.ToString());
            remotePoint = new IPEndPoint(IPAddress.Parse(Hostname), client.RemotePort);
            messages.Add(message);
            listeningSocket.SendTo(buffer, remotePoint);
            current++;
            int currentAttempt = 1;
            while (currentAttempt < MaxAttempt)
            {
                Thread.Sleep(500);
                if (isDelivered == true)
                {
                    Console.WriteLine("Message sent");
                    isDelivered = false;
                    break;
                }
                else
                {
                    Console.WriteLine("An error occurred while sending the message");
                    Console.WriteLine("{0} attempt to send", currentAttempt + 1);
                    if (currentAttempt == MaxAttempt - 1)
                    {
                        Console.WriteLine("Exceeded the maximum number of attempts");
                        Exit();
                        return;
                    }
                    listeningSocket.SendTo(buffer, remotePoint);
                    currentAttempt++;
                }
            }
        }

        private static void Save()
        {
            using StreamWriter StreamWriter = new StreamWriter(new FileStream(DateTime.Now.ToString("yyyy-MM-dd") + ".txt", FileMode.Create), Encoding.Default);
            messages.Sort();
            foreach (var message in messages)
            {
                StreamWriter.WriteLine(message);
            }
        }

        public static void Receiving()
        {
            try
            {
                listeningSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
                IPEndPoint localIP = new IPEndPoint(IPAddress.Parse(Hostname), client.LocalPort);
                listeningSocket.Bind(localIP);
                while (true)
                {
                    StringBuilder builder = new StringBuilder();
                    int bytes = 0;
                    byte[] buffer = new byte[256];
                    EndPoint remoteIp = new IPEndPoint(IPAddress.Any, 0);
                    do
                    {
                        bytes = listeningSocket.ReceiveFrom(buffer, ref remoteIp);
                        var value = Encoding.Unicode.GetString(buffer, 0, bytes);
                        builder.Append(value);
                    }
                    while (listeningSocket.Available > 0);
                    IPEndPoint remoteFullIp = remoteIp as IPEndPoint;
                    Message message = new Message(builder);
                    if (message.MessageType != MessageType.Response)
                    {
                        EndPoint remotePoint = new IPEndPoint(IPAddress.Parse(Hostname), client.RemotePort);
                        Message response = new Message(MessageType.Response);
                        listeningSocket.SendTo(Encoding.Unicode.GetBytes(response.ToString()), remotePoint);
                        Console.WriteLine("{0}-{1}\n{2}", message.AuthorName, message.Date, message.Content);
                        messages.Add(message);
                        current++;
                    }
                    else if (message.MessageType == MessageType.Response)
                    {
                        isDelivered = true;
                    }
                }
            }
            finally
            {
                receiving = new Task(Receiving);
                receiving.Start();
            }
        }

        private static void Exit()
        {
            if (listeningSocket != null)
            {
                listeningSocket.Shutdown(SocketShutdown.Both);
                listeningSocket.Close();
                listeningSocket = null;
            }
        }

        public Client Configure()
        {
            Console.WriteLine("Enter your name");
            string name = Console.ReadLine();
            Console.WriteLine("Enter localPort port");
            int localPort;
            while (true)
            {
                if (int.TryParse(Console.ReadLine(), out localPort))
                {
                    if (localPort > 65535 || localPort < 0)
                    {
                        Console.WriteLine("The LocalPort value must be in the range from 0 to 65535. Re-enter");
                        continue;
                    }
                    break;
                }
                Console.WriteLine("LocalPort must be an integer. Re-enter");
            }
            Console.WriteLine("Enter remotePort port");
            int remotePort;
            while (true)
            {
                if (int.TryParse(Console.ReadLine(), out remotePort))
                {
                    if (remotePort > 65535 || remotePort < 0)
                    {
                        Console.WriteLine("The RemotePort value must be in the range from 0 to 65535. Re-enter");
                        continue;
                    }
                    else if (remotePort == localPort)
                    {
                        Console.WriteLine("RemotePort and LocalPort must not have the same value. Re-enter for RemotePort");
                        continue;
                    }
                    break;
                }
                Console.WriteLine("RemotePort must be an integer. Re-enter");
            }
            Console.Clear();
            return new Client(name, Hostname, localPort, remotePort);
        }
    }
}
