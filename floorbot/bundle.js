define(['legacyRegistry',
    './src/FloorbotTelemetryServerAdapter',
    './src/FloorbotTelemetryInitializer',
    './src/FloorbotTelemetryModelProvider'],
    function (legacyRegistry,
        FloorbotTelemetryServerAdapter,
        FloorbotTelemetryInitializer,
        FloorbotTelemetryModelProvider) {

        legacyRegistry.register("floorbot", {
            "name": "Floorbot Control",
            "description": "Provides floor cleaning robot inspection and command capabilities.",
            "extensions": {
                "types": [
                    {
                        "name": "Simulated Floor Robot",
                        "key": "simfloorbot.bot",
                        "glyph": "s"
                    },
                    {
                        "name": "Subsystem",
                        "key": "simfloorbot.subsystem",
                        "glyph": "o",
                        "model": { "composition": [] }
                    },
                    {
                        "name": "Measurement",
                        "key": "simfloorbot.measurement",
                        "glyph": "T",
                        "model": { "telemetry": {} },
                        "telemetry": {
                            "source": "simfloorbot.source",
                            "domains": [
                                {
                                    "name": "Time",
                                    "key": "timestamp"
                                }
                            ]
                        }
                    }
                ],
                "roots": [
                    {
                        "id": "simfloorbot:bot",
                        "priority": "preferred",
                        "model": {
                            "type": "simfloorbot.bot",
                            "name": "Simulated Floor Robot",
                            "composition": []
                        }
                    }
                ],
                "services": [
                    {
                        "key": "simfloorbot.adapter",
                        "implementation": FloorbotTelemetryServerAdapter,
                        "depends": ["$q", "SIMFLOORBOT_WS_URL"]
                    }
                ],
                "constants": [
                    {
                        "key": "SIMFLOORBOT_WS_URL",
                        "priority": "fallback",
                        "value": "ws://localhost:8081/telemetry"
                    }
                ],
                "runs": [
                    {
                        "implementation": FloorbotTelemetryInitializer,
                        "depends": ["simfloorbot.adapter", "objectService"]
                    }
                ],
                "components": [
                    {
                        "provides": "modelService",
                        "type": "provider",
                        "implementation": FloorbotTelemetryModelProvider,
                        "depends": ["simfloorbot.adapter", "$q"]
                    }
                ]
            }
        });
    });