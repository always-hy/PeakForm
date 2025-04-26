package com.sustech.cs304.project.peakform.config;

import com.alipay.api.AlipayClient;
import com.alipay.api.CertAlipayRequest;
import com.alipay.api.DefaultAlipayClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AlipayConfig {

    @Value("${alipay.gateway}")
    private String gateway;

    @Value("${alipay.appid}")
    private String appId;

    @Value("${alipay.private-key}")
    private String privateKey;

    @Value("${alipay.app-cert-path}")
    private String appCertPath;

    @Value("${alipay.alipay-cert-path}")
    private String alipayCertPath;

    @Value("${alipay.root-cert-path}")
    private String rootCertPath;

    @Value("${alipay.format}")
    private String format;

    @Value("${alipay.charset}")
    private String charset;

    @Value("${alipay.sign-type}")
    private String signType;

    @Bean
    public AlipayClient alipayClient() throws Exception {
        CertAlipayRequest certParams = new CertAlipayRequest();
        certParams.setServerUrl(gateway);
        certParams.setAppId(appId);
        certParams.setPrivateKey(privateKey);
        certParams.setFormat(format);
        certParams.setCharset(charset);
        certParams.setSignType(signType);
        certParams.setCertPath(appCertPath);
        certParams.setAlipayPublicCertPath(alipayCertPath);
        certParams.setRootCertPath(rootCertPath);
        return new DefaultAlipayClient(certParams);
    }
}