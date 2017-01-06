package KiboTaiko.Model;

public class Image {

    private int ID;
    private String name;
    private byte[] image;
    private String imageAlt;

    public Image(int ID, byte[] image, String name, String imageAlt) {
        this.ID = ID;
        this.image = image;
        this.name = name;
        this.imageAlt = imageAlt;
    }

    public Image() {
    }

    public int getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public byte[] getImage() {
        return image;
    }
    public String getImageAlt(){
        return imageAlt;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setname(String name) {
        this.name = name;
    }

    public void setID(int ID) {
        this.ID = ID;
    }
    public void setImageAlt(String imageAlt){
        this.imageAlt = imageAlt;
    }
}
