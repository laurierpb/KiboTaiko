package KiboTaiko.Model;

public class Calandrier {

    private int id;
    private String image;
    private String imageAlt;
    private String contenue;
    private String titleText;

    
    public Calandrier(int id, String image, String imageAlt, String contenue, String titleText) {
        this.id = id;
        this.image = image;
        this.imageAlt = imageAlt;
        this.contenue = contenue;
        this.titleText = titleText;
    }

    public Calandrier(){
        this.id = -1;
        this.image = "";
        this.imageAlt = "";
        this.contenue = "";
        this.titleText = "";
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageAlt() {
        return imageAlt;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public String getContenue() {
        return contenue;
    }

    public void setContenue(String contenue) {
        this.contenue = contenue;
    }

    public String getTitleText() {
        return titleText;
    }

    public void setTitleText(String titleText) {
        this.titleText = titleText;
    }

    
}