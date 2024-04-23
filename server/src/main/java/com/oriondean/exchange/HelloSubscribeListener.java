package com.oriondean.exchange;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class HelloSubscribeListener {

    private final SimpMessagingTemplate template;

    @EventListener
    public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
        Principal user = event.getUser();

        Map nativeHeaders = ((Map) event.getMessage().getHeaders().get("nativeHeaders"));
        List<String> destinations = (List<String>) nativeHeaders.get("destination");

        if (destinations.getFirst().equals("/topic/hello")) {
            template.convertAndSendToUser(user.getName(), "/topic/hello", "Hello " + user.getName());
        }
    }
}