package KiboTaiko.Model;
public class HomeItem {
    private final int id;
    private int order;
    private String contenue;
    private String titre;
    private String image;
    private String imageAlt;

    public HomeItem() {
        this.id = -1;
        this.order = -1;
        this.contenue = "";
        this.titre = "";
        this.image = "";
        this.imageAlt = "";
    }

    public HomeItem(int id, int order, String image, String imageAlt, String contenue, String titre) {
        this.id = id;
        this.order = order;
        this.image = image;
        this.imageAlt = imageAlt;
        this.contenue = contenue;
        this.titre = titre;
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
    
    @Override
    public String toString(){
        String returnValue = "HomeItem : "
                + "\nid       : " + this.getId()
                + "\nOrder    : " + this.getOrder()
                + "\nTitre    : " + this.getTitre()
                + "\nContenue : " + this.getContenue()
                + "\nImage    : " + this.getImage()
                + "\nImageAlt : " + this.getImageAlt();
        return returnValue;
    }
}
