package com.citygames.rest;

import com.citygames.entity.File;
import com.citygames.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class FileRest {

    @Autowired
    private FileService gameService;

    @RequestMapping(value = "/addFile", method= RequestMethod.POST)
    public Long handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
        File newFile = new File();
        newFile.setName(file.getOriginalFilename());
        newFile.setData(file.getBytes());
        return gameService.add(newFile).getId();
    }

}
