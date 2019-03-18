import { Description } from './Description';
import { Communication } from './Communication';
import { Image } from './Image';

export class Patient {
    public FirstName: string;
    public LastName: string;
    public Gender: string;
    public DOB: string;
    public Age: number;
    public Communication: Communication;
    public Description: Description;
    public Image: Image;
}
