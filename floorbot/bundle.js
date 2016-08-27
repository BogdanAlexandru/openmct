define(['legacyRegistry'], function (legacyRegistry) {
    legacyRegistry.register("floorbot", {
        "name": "Floorbot Control",
        "description": "Provides floor cleaning robot inspection and command capabilities.",
        "extensions": {
            "types": [
                {
                    "name": "Sim Floorbot",
                    "key": "floorbot.simulated",
                    "glyph": "S"
                }
            ],
            "roots": [
                {
                    "id": "floorbot:simbot",
                    "priority": "preferred",
                    "model": {
                        "type": "floorbot.simulated",
                        "name": "Sim Floor Robot",
                        "composition": []
                    }
                }
            ]
        }
    });
});