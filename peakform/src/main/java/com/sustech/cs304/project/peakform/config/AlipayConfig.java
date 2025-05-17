package com.sustech.cs304.project.peakform.config;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;

import javax.annotation.PreDestroy;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Profile("dev")
@Configuration
public class AlipayConfig {

    // Load certificates from the classpath
    @Value("classpath:cert/appPublicCert.crt")
    private Resource appCertResource;

    @Value("classpath:cert/alipayPublicCert.crt")
    private Resource alipayCertResource;

    @Value("classpath:cert/alipayRootCert.crt")
    private Resource alipayRootCertResource;

    // Other configuration properties
    @Value("${alipay.gateway}")
    private String gateway;

    @Value("${alipay.appid}")
    private String appId;

    @Value("${alipay.private-key}")
    private String privateKey;

    @Value("${alipay.format}")
    private String format;

    @Value("${alipay.charset}")
    private String charset;

    @Value("${alipay.sign-type}")
    private String signType;

    // List to track temporary files for cleanup
    private List<File> tempFiles = new ArrayList<>();

    @Bean
    public AlipayClient alipayClient() throws Exception {
        // Write certificates to temporary files
        String appCertPath = writeToFile(appCertResource);
        String alipayCertPath = writeToFile(alipayCertResource);
        String rootCertPath = writeToFile(alipayRootCertResource);

        // Create AlipayClient with certificate paths
        return new DefaultAlipayClient(
                gateway,
                appId,
                privateKey
                // alipayPublicKey is not needed in certificate mode
        );
    }

    // Helper method to write a Resource to a temporary file
    private String writeToFile(Resource resource) throws IOException {
        File tempFile = File.createTempFile("alipay-cert", ".crt");
        tempFiles.add(tempFile);
        try (InputStream is = resource.getInputStream();
             OutputStream os = new FileOutputStream(tempFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        }
        return tempFile.getAbsolutePath();
    }

    // Cleanup temporary files on application shutdown
    @PreDestroy
    public void cleanup() {
        for (File file : tempFiles) {
            file.delete();
        }
    }
}