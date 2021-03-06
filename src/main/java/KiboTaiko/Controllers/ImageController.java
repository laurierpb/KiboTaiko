package KiboTaiko.Controllers;

import KiboTaiko.Model.Image;
import KiboTaiko.repositories.ImageRepo;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Image")
public class ImageController {

    /**
     * return a list of all the image on the server.
     * @return a list of all image on the server
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<Image> getImages() {
        System.out.println("ImagesController : GET");
        return ImageRepo.getItems();
    }

    /**
     * Delete the image from the file system
     *
     * @param imageId "image/{imageId}"
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{imageId}")
    public @ResponseBody
    void deleteImage(
            @PathVariable int imageId) {
        System.out.println("Image DELETE : " + imageId);
        ImageRepo.deleteItem(imageId);

    }

    /**
     * Ajoute le Fichier dans le repertoire images. Lance une exception si le
     * fichier existe déjà.
     *
     * @param image l'image qui sera ajouter a la bd
     * @return
     */
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> uploadFile(
            @RequestBody Image image) {
        System.out.println("Image Controller : POST");
        ImageRepo.insertItem(image);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
