package KiboTaiko.Tools;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public class Image_Tool {

    private static final String PATH_NAME = "src/main/resources/static/Images";

    /**
     * return a list of all the file in the folder Images
     * @return a list of all the file in the folder Images
     */
    public static List<String> getAllFileNameFromRootFolderName() {
        File folder = new File(PATH_NAME);
        List<String> liste = new ArrayList<>();
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                liste.addAll(getAllFileNameFromRootFolderName());
            } else {
                liste.add(folder.getName() + "\\" + fileEntry.getName());
            }
        }
        return liste;
    }

    /**
     * Add the image to the file system to the correct folder
     * @param uploadfile data from web form
     * @return true if file was added correctly or false if it failed
     */
    public static boolean addFileToFileSystem(MultipartFile uploadfile) {
        try {
            // Get the filename and build the local file path (be sure that the 
            // application have write permissions on such directory)
            String filename = uploadfile.getOriginalFilename();
            String directory = "src/main/resources/static/Images";
            String filepath = Paths.get(directory, filename).toString();
            
            // Save the file locally
            // Lance une exception si une image porte le meme nom
            BufferedOutputStream stream;
            stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
            stream.write(uploadfile.getBytes());
            stream.close();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }

    /**
     * Delete the file passed in parameter from Image folder
     * @param fileName
     */
    public static void deleteFileFromFileSystem(String fileName) {
        Path path = FileSystems.getDefault().getPath(PATH_NAME, fileName);
        try {
            Files.delete(path);
        } catch (NoSuchFileException x) {
            System.err.format("%s: no such" + " file or directory%n", path);
        } catch (DirectoryNotEmptyException x) {
            System.err.format("%s not empty%n", path);
        } catch (IOException x) {
            // File permission problems are caught here.
            System.err.println(x);
        }
    }
;
}
