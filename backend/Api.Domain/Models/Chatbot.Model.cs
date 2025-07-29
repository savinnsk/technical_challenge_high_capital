namespace Api.Domain.Models
{

    public class ChatbotModel
    {
        private Guid _id;
        public Guid Id
        {
            get { return _id; }
            set { _id = value; }
        }
        private string _name;
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        private string _context;
        public string Context
        {
            get => _context;
            set => _context = value;
        }


        private Guid _userId;
        public Guid UserId
        {
            get { return _userId; }
            set { _userId = value; }
        }



        private DateTime _createAt;
        public DateTime CreateAt
        {
            get { return _createAt; }
            set { _createAt = value == null ? DateTime.UtcNow : value; }
        }


        private DateTime _updateAt;
        public DateTime UpdateAt
        {
            get { return _updateAt; }
            set { _updateAt = value == null ? DateTime.UtcNow : value; }
        }
        
        public List<MessageModel> Messages { get; set; } = new();
    }
}