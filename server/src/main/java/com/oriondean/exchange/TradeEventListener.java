package com.oriondean.exchange;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class TradeEventListener {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final TradeRepository repository;

    @EventListener
    public void handleWebSocketConnectListener(SessionSubscribeEvent event) {
        Principal user = event.getUser();

        simpMessagingTemplate.convertAndSendToUser(user.getName(),"/topic/trades", repository.findAll());
    }


}
