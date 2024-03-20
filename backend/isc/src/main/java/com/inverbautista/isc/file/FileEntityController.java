package com.inverbautista.isc.file;

import com.inverbautista.isc.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class FileEntityController {


    private IFileEntityService fileUpload;


    public FileEntityController(IFileEntityService fileUpload) {
        this.fileUpload = fileUpload;
    }

    @PostMapping(value = "/upload/{raffleId}", consumes = {"multipart/form-data"})
    public List<FileEntity> uploadFile(@PathVariable("raffleId") Long raffleId, @RequestParam List<MultipartFile> images) throws IOException, BusinessLogicException {
    List<FileEntity> imageFiles = fileUpload.uploadFiles(raffleId, images);

        return imageFiles;
    }
}