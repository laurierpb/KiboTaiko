package KiboTaiko.Model;

public class Calendrier {

    private int id;
    private Image image;
    private String contenue;
    private String titleText;

    
    public Calendrier(int id, Image image, String contenue, String titleText) {
        this.id = id;
        this.image = image;
        this.contenue = contenue;
        this.titleText = titleText;
    }

    public Calendrier(){
        this.id = -1;
        this.image = null;
        this.contenue = "";
        this.titleText = "";
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
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