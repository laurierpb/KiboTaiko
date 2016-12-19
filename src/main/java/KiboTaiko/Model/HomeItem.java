package KiboTaiko.Model;
public class HomeItem {
    private final int id;
    private int order;
    private String contenue;
    private String titre;
    private String image;
    private String imageAlt;

    public HomeItem(int id, int order, String contenue, String titre, String image, String imageAlt) {
        this.id = id;
        this.order = order;
        this.contenue = contenue;
        this.titre = titre;
        this.image = image;
        this.imageAlt = imageAlt;
    }

    public String getImageAlt() {
        return imageAlt;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public int getId() {
        return id;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getContenue() {
        return contenue;
    }

    public void setContenue(String contenue) {
        this.contenue = contenue;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    
}
