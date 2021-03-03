using System;
using System.Collections.Generic;
using System.Text;

namespace Chat
{
    class Message : IComparable<Message>
    {
        const char Separator = '~';

        public MessageType MessageType { get; private set; }
        public int Id { get; private set; }
        public string Content { get; private set; }
        public DateTime Date { get; private set; }
        public string AuthorName { get; private set; }

        public Message(MessageType messageType, int id, string content, DateTime date, string authorName)
        {
            this.MessageType = messageType;
            this.Id = id;
            this.Content = content;
            this.Date = date;
            this.AuthorName = authorName;
        }

        public Message(MessageType messageType)
        {
            this.MessageType = messageType;
        }

        public Message(StringBuilder builder)
        {
            string[] data = builder.ToString().Split(Separator);
            this.MessageType = (MessageType)int.Parse(data[0]);
            if (MessageType == MessageType.Сommon)
            {
                this.Id = int.Parse(data[1]);
                this.Content = data[2];
                this.Date = DateTime.Parse(data[3]);
                this.AuthorName = data[4];
            }
        }

        public override string ToString()
        {
            if (this.MessageType == MessageType.Сommon)
            {
                return ((int)MessageType).ToString() + Separator + Id.ToString() + Separator + Content + Separator + Date.ToString() + Separator + AuthorName;
            }
            else
            {
                return ((int)MessageType).ToString();
            }
        }

        public int CompareTo(Message message)
        {
            return this.Id.CompareTo(message.Id);
        }
    }
}
