package com.inverbautista.isc.file;

import com.inverbautista.isc.exception.BusinessLogicException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface IFileEntityService {
    List<FileEntity> uploadFiles(Long raffleId, List<MultipartFile> multipartFiles) throws IOException, BusinessLogicException;
}
