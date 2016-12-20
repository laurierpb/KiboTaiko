/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package KiboTaiko.Controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/uploadFile")
public class UploadController {
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
        System.out.println("uploadController");

        try {
            // Get the filename and build the local file path (be sure that the 
            // application have write permissions on such directory)
            String filename = uploadfile.getOriginalFilename();
            String directory = "src/main/resources/static/Images";
            String filepath = Paths.get(directory, filename).toString();
            System.out.println(filename);

            // Save the file locally
            // Lance une exception si une image porte le meme nom
            BufferedOutputStream stream;
            stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
            stream.write(uploadfile.getBytes());
            stream.close();
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
