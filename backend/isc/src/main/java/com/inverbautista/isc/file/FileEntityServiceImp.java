package com.inverbautista.isc.file;

import com.cloudinary.Cloudinary;
import com.cloudinary.Singleton;
import com.cloudinary.utils.ObjectUtils;
import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.raffle.IRaffleService;
import com.inverbautista.isc.raffle.Raffle;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FileEntityServiceImp implements IFileEntityService {

    @Value("${cloudinary.url}")
    private String cloudinaryUrl;
    private IRaffleService raffleService;
    
    private FileEntityRepository fileEntityRepository;

    private Cloudinary cloudinary;

    public FileEntityServiceImp(IRaffleService raffleService, FileEntityRepository fileEntityRepository) {
        this.raffleService = raffleService;
        this.fileEntityRepository = fileEntityRepository;
    }

    @Override
    public List<FileEntity> uploadFiles(Long raffleId, List<MultipartFile> multipartFiles) throws IOException, BusinessLogicException {
        this.cloudinary = new Cloudinary(cloudinaryUrl);
        this.cloudinary.config.secure = true;

        List<FileEntity> fileList = new ArrayList<FileEntity>();

        Raffle raffle = raffleService.getRaffleEntityById(raffleId);

        for (MultipartFile multipartFile:multipartFiles) {
            Map response = cloudinary.uploader().upload(multipartFile.getBytes(),
                    Map.of("folder", raffleId+"") );

            FileEntity file = new FileEntity();
            file.setUrl(response.get("secure_url").toString());
            file.setRaffle(raffle);

            fileList.add(fileEntityRepository.save(file));

        }

        raffle.getImages().addAll(fileList);

        raffleService.saveRaffle(raffle);

        return fileList;
    }
}