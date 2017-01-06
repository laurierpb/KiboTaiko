package KiboTaiko.Controllers;

import KiboTaiko.Model.Image;
import KiboTaiko.repositories.ImageRepo;
import java.io.IOException;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
        return ImageRepo.getImages();
    }
    
    /**
     * Delete the image from the file system
     * @param imageId "image/{imageId}"
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{imageId}")
    public @ResponseBody 
        void deleteImage(
            @PathVariable int imageId) {
            System.out.println("Image DELETE : " + imageId);
            ImageRepo.deleteImage(imageId);
            
    }
        
    /**
     * Ajoute le Fichier dans le repertoire images. 
     * Lance une exception si le fichier existe déjà. 
     * @param uploadfile, provient du controlleur web
     * @return
     */
    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> uploadFile(
           @RequestParam("uploadfile") MultipartFile uploadfile) {
        System.out.println("Image Controller : POST => " + uploadfile.getOriginalFilename());
        if(uploadfile.getOriginalFilename().equals("")) return new ResponseEntity<>(HttpStatus.OK);
        
        try{
            Image image = new Image();
            byte [] byteArr = uploadfile.getBytes();
            String imageName = uploadfile.getOriginalFilename();
            
            image.setImage(byteArr);
            image.setname(imageName);
            ImageRepo.postImage(image);
        }catch(IOException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
