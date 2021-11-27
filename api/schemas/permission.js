// importing dependencies
const mongoose = require("mongoose");

// creating permission schema to be stored in db
const permissionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    permissionName: {
        type: String
    },
    permissions: {
        department: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        role: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        permission: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        lms: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        employee: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        training: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        appraisal: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        union: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        safetyObservation: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        incidentInvestigation: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        ideaAndOpportunity: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        meeting: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        ptw: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        locationRiskAssessment: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        aspectsAndImpacts: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        compliance: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        medicalConsultation: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        nonConformance: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        equipment: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        part: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        workOrder: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        policy: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        procedure: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        workInstruction: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        technicalManual: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        },
        safetyAlert: {
            canCreate: {
                type: Boolean,
                default: false
            },
            canUpdate: {
                type: Boolean,
                default: false
            },
            canRead: {
                type: Boolean,
                default: false
            },
            canDelete: {
                type: Boolean,
                default: false
            }
        }
    },

    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "permissions", strict: false }
)

// exporting schema
module.exports = mongoose.model("Permission", permissionSchema);