namespace Api.Domain.Dto
{
    public class GptResponse
    {
        public List<GptOutput> output { get; set; }
    }

    public class GptOutput
    {
        public List<GptContent> content { get; set; }
    }

    public class GptContent
    {
        public string type { get; set; }
        public string text { get; set; }
    }
}