package KiboTaiko.Controllers;

import KiboTaiko.Tools.Image_Tool;
import KiboTaiko.repositories.tools.Helper;
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
    List<String> getImages() {
        try{
        Helper.getConnection();}catch(Exception e){System.out.println(e);}
        System.out.println("ImagesController : GET");
        return Image_Tool.getAllFileNameFromRootFolderName();
    }
    
    /**
     * Delete the image from the file system
     * @param imageName "image/{imageName}"
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{imageName:.+}")
    public @ResponseBody 
        void deleteImage(
            @PathVariable String imageName) {
            System.out.println("Image Controller : DELETE => " + imageName);
            Image_Tool.deleteFileFromFileSystem(imageName);
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
        
        if(!Image_Tool.addFileToFileSystem(uploadfile)){
            System.out.println("bad-request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
