package com.citygames.service.impl;

import com.citygames.entity.File;
import com.citygames.repository.FileRepository;
import com.citygames.service.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class FileServiceImpl implements FileService {

    @Autowired
    private FileRepository teamRepository;

    @Override
    public File add(File file) {
        return teamRepository.save(file);
    }
}
