package KiboTaiko.Model;
public class HomeItem {
    private final int id;
    private int order;
    private String contenue;
    private String titre;
    private Image image;

    public HomeItem() {
        this.id = -1;
        this.order = -1;
        this.contenue = "";
        this.titre = "";
        this.image = null;
    }

    public HomeItem(int id, int order, Image image, String contenue, String titre) {
        this.id = id;
        this.order = order;
        this.image = image;
        this.contenue = contenue;
        this.titre = titre;
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

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
    
    @Override
    public String toString(){
        String returnValue = "HomeItem : "
                + "\nid       : " + this.getId()
                + "\nOrder    : " + this.getOrder()
                + "\nTitre    : " + this.getTitre()
                + "\nContenue : " + this.getContenue()
                + "\nImage    : " + this.getImage().getName();
        return returnValue;
    }
}
