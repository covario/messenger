export interface InitialState {
  user: {
    id: number;
    image: string;
    name: string;
    email: string;
  };
}

export const initialState: InitialState = {
  user: {
    id: 12345,
    image: 'path/to/image',
    name: 'Enter Username',
    email: '',
  },
};
