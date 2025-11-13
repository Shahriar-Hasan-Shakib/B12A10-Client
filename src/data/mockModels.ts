// Mock AI Models Data for Development
export const mockAIModels = [
    {
        _id: "1",
        name: "BERT",
        framework: "TensorFlow",
        useCase: "NLP",
        dataset: "Wikipedia & BookCorpus",
        description: "Bidirectional Encoder Representations from Transformers. A powerful transformer-based model for natural language understanding tasks like text classification, question answering, and named entity recognition.",
        image: "https://i.ibb.co/ZMxqY3h/bert-model.jpg",
        createdBy: "admin@example.com",
        createdAt: "2025-11-10T10:30:00.000Z",
        purchased: 15
    },
    {
        _id: "2",
        name: "GPT-4",
        framework: "PyTorch",
        useCase: "NLP",
        dataset: "Internet Text",
        description: "Generative Pre-trained Transformer 4. The latest iteration of OpenAI's language model, capable of understanding and generating human-like text for various applications including chatbots, content creation, and code generation.",
        image: "https://i.ibb.co/9ykW7Jr/gpt4-model.jpg",
        createdBy: "openai@example.com",
        createdAt: "2025-11-12T14:20:00.000Z",
        purchased: 42
    },
    {
        _id: "3",
        name: "ResNet-50",
        framework: "PyTorch",
        useCase: "Computer Vision",
        dataset: "ImageNet",
        description: "Residual Network with 50 layers. A deep convolutional neural network architecture that uses residual connections to enable training of very deep networks for image classification and feature extraction.",
        image: "https://i.ibb.co/qNKwZqM/resnet-model.jpg",
        createdBy: "vision@example.com",
        createdAt: "2025-11-08T09:15:00.000Z",
        purchased: 28
    },
    {
        _id: "4",
        name: "YOLO v8",
        framework: "PyTorch",
        useCase: "Object Detection",
        dataset: "COCO",
        description: "You Only Look Once version 8. State-of-the-art real-time object detection model that can identify and locate multiple objects in images and videos with high accuracy and speed.",
        image: "https://i.ibb.co/8x9ZqKp/yolo-model.jpg",
        createdBy: "ultralytics@example.com",
        createdAt: "2025-11-11T16:45:00.000Z",
        purchased: 35
    },
    {
        _id: "5",
        name: "Stable Diffusion",
        framework: "PyTorch",
        useCase: "Image Generation",
        dataset: "LAION-5B",
        description: "A latent text-to-image diffusion model capable of generating high-quality images from text descriptions. Perfect for creative applications, art generation, and image editing.",
        image: "https://i.ibb.co/9ZHqYmB/stable-diffusion.jpg",
        createdBy: "stability@example.com",
        createdAt: "2025-11-13T11:00:00.000Z",
        purchased: 56
    },
    {
        _id: "6",
        name: "Whisper",
        framework: "PyTorch",
        useCase: "Speech Recognition",
        dataset: "680k hours of audio",
        description: "OpenAI's robust speech recognition model trained on diverse audio data. Capable of multilingual speech recognition, translation, and language identification with high accuracy.",
        image: "https://i.ibb.co/3TQnYcL/whisper-model.jpg",
        createdBy: "openai@example.com",
        createdAt: "2025-11-09T13:30:00.000Z",
        purchased: 22
    },
    {
        _id: "7",
        name: "LLaMA 2",
        framework: "PyTorch",
        useCase: "NLP",
        dataset: "2 trillion tokens",
        description: "Meta's Large Language Model. An open-source foundation model optimized for dialogue and various NLP tasks, available in multiple sizes from 7B to 70B parameters.",
        image: "https://i.ibb.co/7KqFGRt/llama-model.jpg",
        createdBy: "meta@example.com",
        createdAt: "2025-11-07T08:00:00.000Z",
        purchased: 31
    },
    {
        _id: "8",
        name: "EfficientNet-B7",
        framework: "TensorFlow",
        useCase: "Computer Vision",
        dataset: "ImageNet",
        description: "A family of convolutional neural networks that achieve state-of-the-art accuracy with significantly fewer parameters and FLOPS through compound scaling.",
        image: "https://i.ibb.co/VYxXdJq/efficientnet.jpg",
        createdBy: "google@example.com",
        createdAt: "2025-11-06T15:20:00.000Z",
        purchased: 18
    },
    {
        _id: "9",
        name: "CLIP",
        framework: "PyTorch",
        useCase: "Multi-Modal",
        dataset: "400M image-text pairs",
        description: "Contrastive Language-Image Pre-training. A neural network that learns visual concepts from natural language supervision, enabling zero-shot image classification and text-to-image matching.",
        image: "https://i.ibb.co/wKqZMNT/clip-model.jpg",
        createdBy: "openai@example.com",
        createdAt: "2025-11-05T12:10:00.000Z",
        purchased: 27
    },
    {
        _id: "10",
        name: "T5",
        framework: "TensorFlow",
        useCase: "NLP",
        dataset: "C4 (Colossal Clean Crawled Corpus)",
        description: "Text-to-Text Transfer Transformer. A unified framework that converts all NLP tasks into text-to-text format, achieving excellent results across translation, summarization, and question answering.",
        image: "https://i.ibb.co/pQYrBHN/t5-model.jpg",
        createdBy: "google@example.com",
        createdAt: "2025-11-04T10:45:00.000Z",
        purchased: 19
    },
    {
        _id: "11",
        name: "SAM (Segment Anything)",
        framework: "PyTorch",
        useCase: "Image Segmentation",
        dataset: "SA-1B (11M images)",
        description: "Meta's foundational model for image segmentation. Can segment any object in any image with remarkable zero-shot performance, enabling new computer vision applications.",
        image: "https://i.ibb.co/c2rXGKP/sam-model.jpg",
        createdBy: "meta@example.com",
        createdAt: "2025-11-03T14:30:00.000Z",
        purchased: 24
    },
    {
        _id: "12",
        name: "MusicGen",
        framework: "PyTorch",
        useCase: "Audio Generation",
        dataset: "20k hours of music",
        description: "Meta's music generation model that creates high-quality music from text descriptions. Supports melody conditioning and can generate music in various styles and genres.",
        image: "https://i.ibb.co/XJ5Yr6m/musicgen.jpg",
        createdBy: "meta@example.com",
        createdAt: "2025-11-02T09:00:00.000Z",
        purchased: 14
    }
];

// Frameworks available
export const AI_FRAMEWORKS = [
    "TensorFlow",
    "PyTorch",
    "Keras",
    "JAX",
    "MXNet",
    "Scikit-learn",
    "Hugging Face",
    "ONNX"
];

// Use cases available
export const AI_USE_CASES = [
    "NLP",
    "Computer Vision",
    "Object Detection",
    "Image Generation",
    "Speech Recognition",
    "Audio Generation",
    "Multi-Modal",
    "Image Segmentation",
    "Time Series",
    "Recommendation Systems",
    "Reinforcement Learning"
];

// Popular datasets
export const AI_DATASETS = [
    "ImageNet",
    "COCO",
    "Wikipedia",
    "BookCorpus",
    "LAION-5B",
    "Common Crawl",
    "OpenWebText",
    "LibriSpeech",
    "AudioSet",
    "Custom Dataset"
];


