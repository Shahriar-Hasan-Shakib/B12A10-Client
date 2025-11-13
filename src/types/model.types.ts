// TypeScript types and interfaces for AI Models

export interface AIModel {
    _id: string;
    name: string;
    framework: string;
    useCase: string;
    dataset: string;
    description: string;
    image: string;
    createdBy: string;
    createdAt: string;
    purchased: number;
}

export interface CreateModelInput {
    name: string;
    framework: string;
    useCase: string;
    dataset: string;
    description: string;
    image: string;
}

export type UpdateModelInput = Partial<CreateModelInput>;

export type Framework = 'TensorFlow' | 'PyTorch' | 'Keras' | 'Scikit-learn' | 'JAX' | 'MXNet' | 'Other';

export type UseCase = 'NLP' | 'Computer Vision' | 'Speech Recognition' | 'Reinforcement Learning' | 'Time Series' | 'Recommendation Systems' | 'Other';
